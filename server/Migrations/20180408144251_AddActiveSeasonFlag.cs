using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace server.Migrations
{
    public partial class AddActiveSeasonFlag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Seasons",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Seasons");
        }
    }
}
