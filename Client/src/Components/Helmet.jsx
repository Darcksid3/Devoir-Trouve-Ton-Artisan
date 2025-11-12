import { Helmet } from 'react-helmet';

function MetaInfo(props) {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description}></meta>
        <meta name="robots" content={props.robots}></meta>
        <meta name="googlebot" content={props.robots}></meta>

        <meta property="og:title" content={props.title}></meta>
        <meta property="og:description" content={props.description}></meta>

        <meta name="twitter:title" content={props.title}></meta>
        <meta name="twitter:description" content={props.description}></meta>
      </Helmet>
    </div>
  );
}

export default MetaInfo;