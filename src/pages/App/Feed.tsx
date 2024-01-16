import CreatePost from '../../Dialogs/CreatePost';
import FeedItem from '../../components/FeedItem';

function Feed() {
  return (
    <div className="tw-flex tw-flex-col tw-mt-10 tw-flex-grow tw-max-w-[700px] ">
      <CreatePost />

      <div className="tw-mt-10 tw-flex tw-flex-col tw-gap-10">

        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />

      </div>

    </div>
  );
}

export default Feed;