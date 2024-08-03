import { render, screen } from '@testing-library/react'
import ProductImageGallery from './ProductImageGallery'

describe('ProductImageGallery', () => {
  it('should render nothing if given an empty array', () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('should render a list of images', () => {
    const imageUrls = ['url1', 'url2']

    render(<ProductImageGallery imageUrls={imageUrls} />)
  })
})
