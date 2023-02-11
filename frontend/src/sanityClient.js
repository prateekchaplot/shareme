import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export default sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-02-10',
    useCdn: false,
    token: process.env.REACT_APP_SANITY_PROJECT_TOKEN
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)