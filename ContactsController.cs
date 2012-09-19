using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web.Http;

namespace Contacts
{
    public class ContactsController : ApiController
    {

        public IEnumerable<Contact> GetContacts()
        {
            var repository = new ContactsRepository();
            return repository.GetAllContacts();
        }


        public bool Post([FromBody]Contact contact)
        {
            var repository = new ContactsRepository();
            repository.AddOrUpdate(contact);
            repository.SaveChanges();
            return true;
        }

        //public void Put(int id, [FromBody]string contacts)
        //{
        //}

        //public void Delete(int id)
        //{
        //}
    }

    [Table("contact")]
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string OfficeNumber { get; set; }
        public string MobileNumber { get; set; }
        public string HomeNumber { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}