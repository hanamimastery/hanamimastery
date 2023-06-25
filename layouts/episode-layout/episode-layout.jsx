import * as React from 'react';

import { Grid, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { SeoComponent } from '../../features/seo';
import { useStyles } from './episode-layout.styles';
import BuyMeACoffee from '../../features/buy-me-a-coffee-button';
import Discussions from '../../features/content/discussions';
import EmailSubscriptionForm from '../../features/email-subscription-form';
import EpisodeSchema from '../../features/content-schemas/episode-schema';
import EpisodeTabs from '../episode-tabs';
import GHSponsor from '../../features/gh-sponsor';
import ShareButtons from '../../features/share-buttons';
import YoutubeEmbed from '../../features/youtube-embed';
import SidebarSponsors from '../../features/sidebar-sponsors';
import SidebarJobOffers from '../../features/sidebar-job-offers';
import ProTag from '../../features/content/pro-tag';
import {
  shouldDisplayArticle,
  shouldDisplayDiscussions,
  shouldDisplayVideo,
} from '../../utils/display-queries';
import TableOfContents from '../../features/table-of-contents/table-of-contents';

const EpisodeLayout = ({ episode, children }) => {
  const classes = useStyles();

  const {
    query: { view },
  } = useRouter();

  const { topics, videoId, title, thumbnail, id, excerpt, url, discussions } =
    episode;

  const displayArticle = React.useMemo(
    () => shouldDisplayArticle(view),
    [view]
  );
  const displayDiscussions = React.useMemo(
    () => shouldDisplayDiscussions(view),
    [view]
  );
  const displayVideo = React.useMemo(() => shouldDisplayVideo(view), [view]);

  let prefix;
  if (view === 'discuss') {
    prefix = 'Discussions for ';
  } else {
    prefix = '';
  }

  return (
    <>
      <SeoComponent
        title={`${prefix}${title}`}
        thumbnails={thumbnail}
        topics={topics}
        url={episode.url}
        excerpt={`${prefix}${excerpt}`}
      />
      <EpisodeSchema episode={episode} />
      <section
        className={classes.hero}
        style={{ backgroundImage: `url("${thumbnail.full}")` }}
      >
        <div className={classes.heroFilterWrapper}>
          <Typography variant="h1" align="center" className={classes.heroTitle}>
            {title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            className={classes.heroSubtitle}
          >
            {`Episode #${id}`}
            <ProTag pro={episode.premium} />
          </Typography>
        </div>
      </section>
      <Container className={classes.container} component="main">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={2} component="aside">
            <Box sx={{ position: 'sticky', top: '70px', overflowY: 'auto' }}>
              <EpisodeTabs episode={episode} />
              <TableOfContents headings={episode.headings} url={episode.url} />
            </Box>
          </Grid>
          <Grid
            sm={12}
            md={8}
            lg={7}
            item
            component="article"
            className={classes.article}
            sx={{ width: '100%' }}
          >
            <ShareButtons data={episode} />
            {displayVideo && <YoutubeEmbed embedId={videoId} />}
            {displayArticle && children}
            {displayDiscussions && (
              <Discussions
                discussions={discussions}
                title={title}
                url={url}
                identifier={`episode-${id}`}
              />
            )}
          </Grid>
          <Grid
            xs={12}
            md={4}
            lg={3}
            container
            item
            flexDirection="column"
            alignItems="center"
          >
            <GHSponsor className={classes.card} />
            <BuyMeACoffee className={classes.card} />
            <EmailSubscriptionForm className={classes.card} />
            <SidebarSponsors />
            <SidebarJobOffers />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EpisodeLayout;
