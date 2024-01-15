import FeedItem from '../../components/FeedItem';

function Feed() {
  return (
    <div className="tw-flex tw-flex-col tw-mt-10 tw-flex-grow tw-max-w-[700px] ">
      <button className=" tw-bg-[#FF748D] tw-shadow-lg tw-text-white tw-w-[150px] tw-p-4 tw-px-12 tw-rounded-[11px] tw-font-bold tw-flex tw-justify-center">Write</button>

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