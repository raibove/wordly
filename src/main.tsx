import './triggers/install.js';
import './triggers/upgrade.js';
import './menu-actions/newChallenge.js';

import { Devvit, useAsync, useState } from '@devvit/public-api';
import { DEVVIT_SETTINGS_KEYS } from './constants.js';
import { sendMessageToWebview } from './utils/utils.js';
import { WebviewToBlockMessage } from '../game/shared.js';
import { WEBVIEW_ID } from './constants.js';
import { Preview } from './components/Preview.js';
import { getPokemonByName } from './core/pokeapi.js';
import { ChallengeToPost } from './challengeToPost.js';
import { Challenge } from './challenge.js';


Devvit.addSettings([
  // Just here as an example
  {
    name: DEVVIT_SETTINGS_KEYS.SECRET_API_KEY,
    label: 'API Key for secret things',
    type: 'string',
    isSecret: true,
    scope: 'app',
  },
]);

Devvit.configure({
  redditAPI: true,
  http: true,
  redis: true,
  realtime: true,
});

// Devvit.addMenuItem({
//   // Please update as you work on your idea!
//   label: 'Create wordly',
//   location: 'subreddit',
//   forUserType: 'moderator',
//   onPress: async (_event, context) => {
//     const { reddit, ui } = context;
//     const subreddit = await reddit.getCurrentSubreddit();
//     const post = await reddit.submitPost({
//       // Title of the post. You'll want to update!
//       title: 'My first experience post',
//       subredditName: subreddit.name,
//       preview: <Preview />,
//     });
//     ui.showToast({ text: 'Created post!' });
//     ui.navigateTo(post.url);
//   },
// });

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Wordly',
  height: 'tall',
  render: (context) => {
    const [initialState] = useState<{
      user: {
        username: string | null;
        avatar: string | null;
      } | null;
      challenge: number;
    }>(async () => {
      const [user, challenge] = await Promise.all([
        context.reddit.getCurrentUser(),
        ChallengeToPost.getChallengeNumberForPost({
          redis: context.redis,
          postId: context.postId!,
        }),
      ]);

      if (!user) {
        return {
          user: null,
          challenge,
        };
      }

      const avatar = await context.reddit.getSnoovatarUrl(user.username);

      return { user: { username: user.username, avatar: avatar ?? null }, challenge };
    });

    console.log(initialState);
    if (!initialState.user?.username) {
      return <Preview text="Please login to play." />;
    }

    const [launched, setLaunched] = useState(false);

    return (
      <vstack height="100%" width="100%" alignment="center middle">
        {launched ? (
          <webview
            id={WEBVIEW_ID}
            url="index.html"
            width={'100%'}
            height={'100%'}
            onMessage={async (event) => {
              console.log('<< Received message', event);
              const data = event as unknown as WebviewToBlockMessage;
              
              switch (data.type) {
                case 'INIT':
                  const challengeNumber = await ChallengeToPost.getChallengeNumberForPost({
                    postId: context.postId!,
                    redis: context.redis,
                  });
                  const username =  initialState.user?.username!;
                  const [challengeInfo] = await Promise.all([
                    Challenge.getChallenge({
                      challenge: challengeNumber,
                      redis: context.redis,
                    }),
                  ]);

                  sendMessageToWebview(context, {
                    type: 'INIT_RESPONSE',
                    payload: {
                      postId: context.postId!,
                      username,
                      challengeInfo
                    },
                  });
                  break;

                default:
                  console.error('Unknown message type', data satisfies never);
                  break;
              }
            }}
          />
        ) : (
          <button
            onPress={() => {
              setLaunched(true);
            }}
          >
            Launch
          </button>
        )}
      </vstack>
    );
  },
});

export default Devvit;
