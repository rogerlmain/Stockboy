using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Stockboy.Models;

using static Stockboy.Classes.Globals;


namespace Stockboy.Classes.Data {

	public class DynamicContext<Model>: DbContext where Model : class {
		DbSet<Model> model { get; set; }

		private DynamicContext (DbContextOptions options) : base (options) {}

		public static DynamicContext<Model> Create () {
			DbContextOptionsBuilder builder = new DbContextOptionsBuilder ();
			builder.UseMySQL (AppSettings ().GetConnectionString ("MySqlConnection"));
			return new DynamicContext<Model> (builder.Options);
		}// Create;
    }// DynamicContextl


	public class Database {

		public List<Model>? ExecuteProcedure<Model> (string procedure, params String [] parameters) where Model : class {

			if (is_null (parameters)) return null;

			List<String>? values = null;

			foreach (object value in parameters) {
				values ??= new ();
				values.Add (value.IsNumeric () ? value as string : $"'{value}'");
			}// foreach;

			String sql = $"call {procedure} ({values.Join (", ")})";

			return DynamicContext<Model>.Create ().Set<Model> ().FromSql (FormattableStringFactory.Create (sql)).ToList ();

		}// ExecuteProcedure;


	}// Database;

}// namespace;