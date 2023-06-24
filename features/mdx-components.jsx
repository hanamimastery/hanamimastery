import { Typography, Chip, createStyles, Grid } from '@mui/material';
import { makeStyles, withStyles, withTheme } from '@mui/styles';
import CourseAd from './course-ad';
import EmailSubscriptionForm from './email-subscription-form/index';
import YoutubeEmbed from './youtube-embed';
import GHSponsor from './gh-sponsor';
import TopicSuggestion from './topic-suggestion';
import MuiCustomLink from './custom-link';

const CustomChip = withTheme(
  withStyles((theme) => ({
    root: {
      backgroundColor: 'transparent',
      boxShadow: `inset 0 -1px 0 ${theme.palette.grey[400]}`,
      borderRadius: `${theme.spacing(0.75)}px`,
      padding: `${theme.spacing(3 / 8)}px ${theme.spacing(5 / 8)}px`,
      border: `1px solid ${theme.palette.grey[400]}`,
      lineHeight: `${theme.spacing(10 / 8)}px`,
      fontSize: `11px`,
    },
    labelSmall: {
      padding: 0,
    },
  }))(Chip)
);
const Kbd = ({ children }) => <CustomChip size="small" label={children} />;

const useImageStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1rem',
    },
    image: {
      maxWidth: '100%',
      borderRadius: '0.3rem',
    },
    caption: {
      lineHeight: '20px',
      color: theme.palette.grey[600],
      textAlign: 'center',
    },
  })
);
const CustomImage = ({ src, alt }) => {
  const classes = useImageStyles();
  return (
    <span className={classes.wrapper}>
      <img src={src} alt={alt} className={classes.image} />
      <Typography variant="h5" className={classes.caption} component="span">
        {alt}
      </Typography>
    </span>
  );
};

const CustomLink = (props) => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  if (isInternalLink) {
    return <MuiCustomLink href={href}>{props.children}</MuiCustomLink>;
  }

  return (
    <MuiCustomLink target="_blank" href={href}>
      {props.children}
    </MuiCustomLink>
  );
};

const useHeaderStyles = makeStyles(() =>
  createStyles({
    root: {
      '&[id]:before': {
        display: 'block',
        height: '6rem',
        marginTop: '-6rem',
        visibility: 'hidden',
        content: `""`,
      },
      '&[id]:hover a': { opacity: 1 },
    },
    anchor: {
      marginLeft: '0.375rem',
      opacity: '0',
      '&:focus': {
        opacity: 1,
        boxShadow: 'outline',
      },
    },
  })
);

const CustomHeader = ({ variant, children, id, ...props }) => {
  const classes = useHeaderStyles();
  return (
    <Typography
      className={classes.root}
      variant={variant}
      id={id}
      gutterBottom
      {...props}
    >
      {children}
      {id && (
        <CustomLink
          className={classes.anchor}
          color="primary"
          aria-label="anchor"
          href={`#${id}`}
        >
          #
        </CustomLink>
      )}
    </Typography>
  );
};
const Om = ({ om }) => <div id={om} />;

const CustomQuote = (props) => (
  <blockquote className="quote">{props.children}</blockquote>
);

const MDXComponents = {
  h1: (props) => <CustomHeader variant="h1" my={4} {...props} />,
  h2: (props) => <CustomHeader variant="h2" {...props} />,
  h3: (props) => <CustomHeader variant="h3" {...props} />,
  h4: (props) => <CustomHeader variant="h4" {...props} />,
  h5: (props) => <CustomHeader variant="h5" {...props} />,
  h6: (props) => <CustomHeader variant="h6" {...props} />,
  p: (props) => <Typography {...props} paragraph />,
  li: (props) => <Typography {...props} component="li" />,
  kbd: (props) => <Kbd {...props} />,
  a: (props) => <CustomLink {...props} />,
  img: (props) => <CustomImage {...props} />,
  blockquote: (props) => <CustomQuote {...props} />,
  CourseAd,
  EmailSubscriptionForm,
  Om,
  Grid,
  Typography,
  YoutubeEmbed,
  GHSponsor,
  CustomHeader,
  TopicSuggestion,
};

export default MDXComponents;
