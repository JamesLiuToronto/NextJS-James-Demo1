import { format, parseISO } from 'date-fns';

function formatDateToYYYYMMDD(inputDate: string | Date): string {
  let postDate: Date;
  
  if (typeof inputDate === 'string') {
    postDate = parseISO(inputDate);
  } else if (inputDate instanceof Date) {
    postDate = inputDate;
  } else {
    postDate = new Date();
  }

  // Format postDate to 'yyyy-MM-dd'
  const formattedDate = format(postDate, 'yyyy-MM-dd');
  return formattedDate;
}

export default formatDateToYYYYMMDD;