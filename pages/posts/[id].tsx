import Head from 'next/head';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Layout from './../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
// import Date from '../components/date/index';
import utilStyles from '../../styles/utils.module.css'
import { Context } from 'vm';

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
          {postData.date}
          {/* <Date dateString={postData.date} /> */}
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }

}

export const getStaticProps: GetStaticProps = async (context: Context) => {
  const { params } = context;
  const postData = await getPostData(params.id);
  return {
    props: { postData }
  }
  // Fetch necessary data for the blog post using params.id
}
