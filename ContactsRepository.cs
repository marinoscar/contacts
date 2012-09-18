using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Contacts
{
    public class ContactsRepository
    {
        public ContactsRepository()
        {
            InitializeClass((IDbContext) new ContactsDbContext());
        }

        public ContactsRepository(IDbContext context)
        {
            InitializeClass(context);
        }

        private void InitializeClass(IDbContext context)
        {
            DbContext = context;
            DbContext.LoadEntities();
            Contacts = (IDbSet<Contact>)DbContext.Entities.Single(i => i.Name == "Contacts").Entity;
        }

        public IDbSet<Contact> Contacts { get; set; }
        public IDbContext DbContext { get; protected set; }

        public IEnumerable<Contact> GetAllContacts()
        {
            return (from c in Contacts select c);
        } 
    }
}