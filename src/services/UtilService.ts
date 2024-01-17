import moment from 'moment';
import { IUser } from '../types/Types';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatDateDisplay : (date: any) => {
    const d = moment(new Date(date.seconds * 1000));
    const now = moment();
      
    const diffSeconds = now.diff(d, 'seconds');
    const diffMinutes = now.diff(d, 'minutes');
    const diffHours = now.diff(d, 'hours');
    const diffDays = now.diff(d, 'days');
      
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (now.year() === d.year()) {
      return d.format('MMM D');
    } else {
      return d.format('YYYY/MM/DD');
    }
  },

  getUserFollowersCount : (user:IUser) => {
    return Object.keys(user.followers).length;
  }

};