import React from 'react'

function ProductImg() {
  return (
      <form 
      // onSubmit={handleSubmit}
      >
        <input
          type="file"
          placeholder="Enter image URL"
          // value={imageUrl}
          // onChange={handleChange}
        />
        <button type="submit">Add Image</button>
      </form>
  )
}

export default ProductImg