using System.Collections.Generic;
using System.Web.Http;

namespace Contacts
{
    public class ContactsController : ApiController
    {

        private IList<Contact> _contacts;
 
        private void InitializeController()
        {
            _contacts = new List<Contact>()
                            {
                                new Contact(){Id = 1, Name = "Oscar", LastName = "Marin"},
                                new Contact(){Id = 2, Name = "Pamela", LastName = "Molina"}
                            };
        }

        public IEnumerable<Contact> GetContacts()
        {
            if(_contacts == null) InitializeController();
            return _contacts;
        }

        
        public void Post([FromBody]string value)
        {
        }

        public void Put(int id, [FromBody]string value)
        {
        }

        public void Delete(int id)
        {
        }
    }

    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
    }
}