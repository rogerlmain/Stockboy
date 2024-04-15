using Stockboy.Models;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Reflection;

using static Stockboy.Classes.Globals;

namespace Stockboy.Classes.Data
{

    public class Database
    {

        private const string connection_string = "Data Source=BURNIE; Initial Catalog=Stockboy; User ID=rex; Password=rex1";

        private DbContext context = new(connection_string);


        public List<Model>? ExecuteProcedure<Model>(string query, object parameters)
        {
            List<SqlParameter>? sql_parameters = null;
            string query_string = string.Empty;
            foreach (PropertyInfo property in parameters.GetType().GetProperties())
            {
                object value = property.GetValue(parameters);
                if (property.Name == "id") continue;
                if (query_string != string.Empty) query_string += comma;
                sql_parameters ??= new();
                sql_parameters.Add(new SqlParameter { ParameterName = $"@{property.Name}", Value = (value is null) ? DBNull.Value : value });
                query_string += $" @{property.Name}";
            }

            return context.Database.SqlQuery<Model>($"{query}{query_string}", sql_parameters?.ToArray()).ToList();
        }

        public Guid? ExecuteProcedureGetId(string query, object parameters)
        {
            List<BaseModel>? result = ExecuteProcedure<BaseModel>(query, parameters);
            return (result is not null) && result?.Count > 0 ? result[0].id : null;
        }

        public void ExecuteProcedureSetId<Model>(string query, IBaseModel parameters)
        {
            Guid? result = ExecuteProcedureGetId(query, parameters);
            parameters.id = result;
        }

        public Model? ExecuteProcedureGetRow<Model>(string query, object parameters)
        {
            List<Model>? result = ExecuteProcedure<Model>(query, parameters);
            return (result is not null) && result?.Count > 0 ? result[0] : default;
        }

        public List<Model> ExecuteQuery<Model>(string query)
        {
            return context.Database.SqlQuery<Model>(query).ToList();
        }

        public Model? ExecuteQueryGetRow<Model>(string query)
        {
            List<Model>? result = ExecuteQuery<Model>(query);
            return (result is not null) && result?.Count > 0 ? result[0] : default;
        }

        public List<Model> Select<Model>(string tablename) => context.Database.SqlQuery<Model>($"select * from {tablename}").ToList();


    }// Database;

}// namespace;