using BookInventory.Api.Models;

namespace BookInventory.Api.Services
{
    public static class BookService
    {
        private static List<Book> Books { get; } = new List<Book>();
        private static int _nextId = 1;

        static BookService()
        {
            Books = new List<Book>
            {
                new Book { Id = 1, Title="Clean Code", Author="Robert C. Martin", Isbn="9780132350884", PublicationDate = new DateTime(2008,8,1) },
                new Book { Id = 2, Title="Atomic Habits", Author="James Clear", Isbn="9780735211292", PublicationDate = new DateTime(2018,10,16) },
                new Book { Id = 3, Title="Pragmatic Programmer", Author="Andrew Hunt", Isbn="9780201616224", PublicationDate = new DateTime(1999,10,30) },
                new Book { Id = 4, Title="Design Patterns", Author="Erich Gamma", Isbn="9780201633610", PublicationDate = new DateTime(1994,10,31) },
            };
            _nextId = 5;
        }


        public static List<Book> GetAll() => Books;

        public static Book? Get(int id) =>
            Books.FirstOrDefault(b => b.Id == id);

        public static Book Add(Book book)
        {
            book.Id = _nextId++;
            Books.Add(book);
            return book;
        }

        public static bool Update(Book book)
        {
            var index = Books.FindIndex(b => b.Id == book.Id);
            if (index == -1) return false;

            Books[index] = book;
            return true;
        }

        public static bool Delete(int id)
        {
            var book = Get(id);
            if (book is null) return false;

            Books.Remove(book);
            return true;
        }
    }
}
