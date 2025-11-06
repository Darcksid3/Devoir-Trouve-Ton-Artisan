import { Helmet } from 'react-helmet';

function MetaInfo(props) {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="robots" content={props.robots} />
        <meta name="googlebot" content={props.robots} />

        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />

        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
      </Helmet>
    </div>
  );
}

export default MetaInfo;