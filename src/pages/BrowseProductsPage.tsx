import { useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductTable from '../components/ProductTable'
import CategorySelect from './CategorySelect'

function BrowseProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>()

  return (
    <div>
      <h1>Products</h1>
      <div className="max-w-xs">
        <CategorySelect onChange={categoryId => setSelectedCategoryId(categoryId)} />
      </div>
      <ProductTable selectedCategoryId={selectedCategoryId} />
    </div>
  )
}

export default BrowseProducts
