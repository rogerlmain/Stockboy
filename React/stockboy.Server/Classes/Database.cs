﻿using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Data;

using static Stockboy.Server.Classes.Globals;


namespace Stockboy.Server.Classes {

	public class Database {


		private static String? ConnectionString { 
			get {
				ConfigurationBuilder builder = new ();
				builder.AddJsonFile ("appsettings.json");
				IConfiguration configuration = builder.Build ();
				return configuration.GetConnectionString ("MySqlConnection");
			}// get;
		}// Connection_string;


		private static MySqlCommand? database_command (String procedure_name, Object parameters, MySqlConnection connection) {

			MySqlCommand command = new (procedure_name, connection);

			command.CommandType = CommandType.StoredProcedure;
			command.Connection.Open ();

			List<String>? keys = parameters.GetKeys ();

			if (is_null (keys)) return null;

			foreach (String key in keys!) {
				command.Parameters.AddWithValue (key, parameters.GetValue (key));
			}// foreach;

			return command;

		}// database_command;


		/********/


		public static List<Model>? CallProcedure<Model> (String procedure_name, Object parameters) where Model: new () {
			using (var connection = new MySqlConnection (ConnectionString)) {

				MySqlCommand? command = database_command (procedure_name, parameters, connection);

				if (is_null (command)) return null;

				MySqlDataReader reader = command!.ExecuteReader ();
				DataTable data_table = new ();

				data_table.Load (reader);

				return JsonConvert.DeserializeObject<List<Model>> (JsonConvert.SerializeObject (data_table));

			}// using;
		}// CallProcedure;


		public static Boolean ExecuteProcedure (String procedure_name, Object parameters) {
			using (var connection = new MySqlConnection (ConnectionString)) {
				try {
					database_command (procedure_name, parameters, connection)?.ExecuteNonQuery ();
				} catch {
					return false;
				}// try;
				return true;
			}// using;
		}// ExecuteProcedure;

	}// Database;

}// Stockboy.Server.Classes;