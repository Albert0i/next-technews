import Link from 'next/link'

const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
    if (res.ok) {
      const categories = await res.json()
      return categories
    }    
  } catch (error) {
    console.log(error)
  }
  return null
}

const CategoriesList = async () => {  
  const categories = await getCategories()  
  return (
    <div className='flex flex-wrap gap-2 text-sm'>
        { categories && 
            categories.map(category =>  
                <Link className='px-4 py-1 text-white rounded-md cursor-pointer bg-slate-900' key={category.id} href={`/categories/${category.catName}`}>{category.catName}</Link>
            ) } 
    </div>
  )
}

export default CategoriesList
