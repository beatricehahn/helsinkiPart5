const BlogForm = ({
    handleCreate,
    newBlog,
    handleUrlChange,
    handleTitleChange,
    handleAuthorChange
}) => {
    return (
        <div>
            <h3>Create new blog</h3>
        
            <form onSubmit={handleCreate}>
            <label>Url:</label>
            <input type='text' value={newBlog.url} onChange={handleUrlChange}></input>
            <br/>
            <label>Title:</label>
            <input type='text' value={newBlog.title} onChange={handleTitleChange}></input>
            <br/>
            <label>Author:</label>
            <input type='text' value={newBlog.author} onChange={handleAuthorChange}></input>
            <br/>
            <button type='submit'>Add blog</button>
            </form>
        </div>
    )
}

export default BlogForm