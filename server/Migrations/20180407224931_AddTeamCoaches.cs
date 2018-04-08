using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace server.Migrations
{
    public partial class AddTeamCoaches : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TeamCoaches",
                columns: table => new
                {
                    TeamCoachId = table.Column<Guid>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    TeamId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamCoaches", x => x.TeamCoachId);
                    table.ForeignKey(
                        name: "FK_TeamCoaches_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "TeamId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamCoaches_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeamCoaches_TeamId",
                table: "TeamCoaches",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamCoaches_UserId",
                table: "TeamCoaches",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeamCoaches");
        }
    }
}
