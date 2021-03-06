using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Server.Models.Authentication;
using Microsoft.Extensions.Options;
using Server.Models;
using System.Linq;
using System.Collections.Generic;

namespace Server.Infrastructure.Authentication
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string userId, ClaimsIdentity identity);
        ClaimsIdentity GenerateClaimsIdentity(string userId, params string[] roles);
    }

    public class JwtFactory : IJwtFactory
    {
        private readonly JwtIssuerOptions _jwtOptions;

        public JwtFactory(IOptions<JwtIssuerOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
            ThrowIfInvalidOptions(_jwtOptions);
        }

        public async Task<string> GenerateEncodedToken(string userId, ClaimsIdentity identity)
        {
            IEnumerable<Claim> claims = new[]
            {
                 new Claim(JwtRegisteredClaimNames.Sub, userId),
                 new Claim(JwtRegisteredClaimNames.UniqueName, userId),
                 new Claim(JwtRegisteredClaimNames.Jti, await _jwtOptions.JtiGenerator()),
                 new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
            };

            claims = claims.Concat(identity.Claims.Where(claim => claim.Type == ClaimTypes.Role).Select(claim => new Claim("roles", claim.Value)));

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                issuer: _jwtOptions.Issuer,
                audience: _jwtOptions.Audience,
                claims: claims,
                notBefore: _jwtOptions.NotBefore,
                expires: _jwtOptions.Expiration,
                signingCredentials: _jwtOptions.SigningCredentials);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public ClaimsIdentity GenerateClaimsIdentity(string userId, params string[] roles) => new ClaimsIdentity(new GenericIdentity(userId, "token"), roles.Select(r => new Claim(ClaimTypes.Role, r)));

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private static long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() -
                               new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero))
                              .TotalSeconds);

        private static void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }
    }
}