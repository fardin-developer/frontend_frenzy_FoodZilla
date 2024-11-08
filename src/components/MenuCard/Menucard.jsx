import React, { useContext, useState } from 'react'
import cartContext from '../context/cartContext'

const ProductsCard = props => {
  const { image, id, category, price, name, description } = props.product
  console.log(image);
  


  const { addItem } = useContext(cartContext)

  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    // here, we cannot directly pass the `props` as it is, if we need to access the same value within the child component. So, we've to pass it as a different prop like this- `{...props}`
    const item = { ...props.product }
    addItem(item)

    setIsAdded(true)

    setTimeout(() => {
      setIsAdded(false)
    }, 3000)
  }

  return (
    <>
      <section className='' >
        
        <div className='card-container' key={id}>
          <div className='card'>
            <figure>
            <img src={`/itemImages/${image}.jpg`} alt='item-img' className='card-media' />
            </figure>
            <div className='card-body'>
              <h2 className='card-price'>Rs {price.toLocaleString()}</h2>
              <h2 className='card-title'>{name}</h2>
              <span className='card-author subtle'>{category}</span>
              <p className='card-description subtle' dangerouslySetInnerHTML={{ __html: description }}></p>
              <button
                type='button'
                className={`homepage-button ${isAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? 'Added' : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsCard
