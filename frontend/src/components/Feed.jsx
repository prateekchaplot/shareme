import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { MasonryLayout, Spinner } from '../components'
import { client } from '../sanityClient'
import { searchQuery, feedQuery } from '../utils/data'

const Feed = () => {

  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)

    const query = categoryId ? searchQuery(categoryId) : feedQuery()
    client.fetch(query)
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
  }, [categoryId])

  if (loading) return <Spinner message='We are adding new ideas to your feed!' />

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed