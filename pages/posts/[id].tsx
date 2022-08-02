import Head from 'next/head';
import Layout from './../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../components/date';
import utilStyles from '../../styles/utils.module.css'

export default function Post(props: { postData: Record<string, any> }) {
  const { postData } = props;
  return (
    <Layout>
      <Head>
        <title>
          {postData.title}
        </title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  console.log('paths', paths)
  return {
    paths,
    fallback: false
  }
  // Return a list of possible value for id
}

export async function getStaticProps({ params: { id } }: { params: { id: string } }) {
  const postData = await getPostData(id);
  return {
    props: { postData }
  }
  // Fetch necessary data for the blog post using params.id
}
