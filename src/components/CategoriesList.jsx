import Link from 'next/link'
import { categoriesData } from '../../data'

const CategoriesList = () => {  
  return (
    <div className='flex flex-wrap gap-2 text-sm'>
        { categoriesData && 
            categoriesData.map(category =>  
                <Link className='px-4 py-1 text-white rounded-md cursor-pointer bg-slate-900' key={category.id} href={`/categories/${category.name}`}>{category.name}</Link>
            ) } 
    </div>
  )
}

export default CategoriesList
