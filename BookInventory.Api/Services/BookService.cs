using BookInventory.Api.Models;

namespace BookInventory.Api.Services
{
    public static class BookService
    {
        private static List<Book> Books { get; } = new List<Book>();
        private static int _nextId = 1;

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
