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

        public void AddOrUpdate(Contact contact)
        {
            if (contact.Id <= 0)
                Contacts.Add(contact);
            else
                Update(contact);
        }

        public void Update(Contact contact)
        {
            var persistedContact = Contacts.Single(c => c.Id == contact.Id);
            persistedContact.Name = contact.Name;
            persistedContact.LastName = contact.LastName;
            persistedContact.Description = contact.Description;
            persistedContact.OfficeNumber = contact.OfficeNumber;
            persistedContact.MobileNumber = contact.MobileNumber;
            persistedContact.Latitude = contact.Latitude;
            persistedContact.Longitude = contact.Longitude;
        }

        public void SaveChanges()
        {
            DbContext.SaveChanges();
        }
    }
}