using BookInventory.Api.Models;
using BookInventory.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookInventory.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        // GET: /api/books
        [HttpGet]
        public ActionResult<List<Book>> GetAll()
        {
            var books = BookService.GetAll();
            return Ok(books); // 200 + list
        }

        // GET: /api/books/{id}
        [HttpGet("{id:int}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = BookService.Get(id);
            if (book is null) return NotFound(); // 404
            return Ok(book); // 200 + book
        }

        // POST: /api/books
        [HttpPost]
        public ActionResult<Book> Create([FromBody] Book book)
        {
            if (string.IsNullOrWhiteSpace(book.Title) ||
                string.IsNullOrWhiteSpace(book.Author) ||
                string.IsNullOrWhiteSpace(book.Isbn))
            {
                return BadRequest("Title, Author, and Isbn are required.");
            }

            var created = BookService.Add(book);

            // 201 + Location header + created book
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: /api/books/{id}
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] Book book)
        {
            if (id != book.Id) return BadRequest("Route id and body id must match.");

            var existingBook = BookService.Get(id);
            if (existingBook is null)
                return NotFound(); // 404 if book doesn't exist

            BookService.Update(book);

            return NoContent(); // 204 success, no response body
        }

        // DELETE: /api/books/5
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var book = BookService.Get(id);

            if (book is null)
                return NotFound(); // 404 if not found

            BookService.Delete(id);

            return NoContent(); // 204 success, no response body
        }
    }
}
