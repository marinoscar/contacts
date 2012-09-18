using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Contacts
{
    public class ContactsDbContext : DbContext, IDbContext
    {
        
        public ContactsDbContext():base("MySql")
        {
            LoadEntities();
        }

        public ContactsDbContext(string connStringOrName)
            : base(connStringOrName)
        {
            LoadEntities();
        }
        
        public virtual DbSet<Contact> Contacts { get; set; }

        public List<object> Entities { get; private set; }

        public void LoadEntities()
        {
            Entities = new List<object> {Contacts};
        }
    }

    public interface IDbContext
    {
        /// <summary>
        /// Contains a collection of the data entities in the DbContext
        /// </summary>
        List<object> Entities { get; }

        /// <summary>
        /// Loads the DbContext into the Entities collection
        /// </summary>
        void LoadEntities();

        /// <summary>
        /// Persists the changes to the data store
        /// </summary>
        int SaveChanges();
    }
}