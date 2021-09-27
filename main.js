const dateInput = document.querySelector('#date');
const checkBtn = document.querySelector('#check');
const result = document.querySelector('#result');

function reverseStr(string1) 
{
    let reversedStr = string1.split('').reverse().join('');
    return reversedStr;
}
  
function isPalindrome(normalString) 
{
    let reversedString = reverseStr(normalString);
    if(normalString==reversedString)
    {
        return true;
    }
    else
    {
        return false;
    }
}
  
function convertDateToString(date) 
{
    let dateString = { day: '', month: '', year: '' };
  
    if (date.day < 10) 
    {
      dateString.day = '0' + date.day;
    }
    else 
    {
      dateString.day = date.day.toString();
    }
  
    if (date.month < 10) 
    {
      dateString.month = '0' + date.month;
    }
    else 
    {
      dateString.month = date.month.toString();
    }
  
    dateString.year = date.year.toString();
    return dateString;
}
  
function getAllDateFormats(date) 
{
    let dateString = convertDateToString(date);
  
    let ddmmyyyy = dateString.day + dateString.month + dateString.year;
    let mmddyyyy = dateString.month + dateString.day + dateString.year;
    let yyyymmdd = dateString.year + dateString.month + dateString.day;
    let ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
    let mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
    let yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
  
function checkPalindromeForAllDateFormats(date)
{
    let listOfPalindromes = getAllDateFormats(date);
  
    let flag = false;
  
    for(let i=0; i < listOfPalindromes.length; i++)
    {
      if(isPalindrome(listOfPalindromes[i]))
      {
        flag = true;
        break;
      }
    }
    
    return flag;
}

function isLeapYear(year)
{
    if(year % 400 === 0)
    {
      return true;
    }
    if(year % 100 === 0)
    {
      return false;
    }
    if(year % 4 === 0)
    {
      return true;
    }
    return false;
}

function getNextDate(date)
{
    let day = date.day + 1;  
    let month = date.month;
    let year = date.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
  
    if(month === 2)
    { 
      
      if(isLeapYear(year))
      { 
        if(day > 29)
        { 
            day = 1;
            month++;  
        }
      }
      else 
      {
        if(day > 28)
        {
           day = 1;
           month++;  
        }
      }
    }
    else 
    {
      if(day > daysInMonth[month - 1])
      { 
        day = 1; 
        month++; 
      }
    }
  
    
    if(month > 12)
    {
      month = 1;
      year++; 
    }
  
    return {
      day: day,  
      month: month,
      year: year
    };
}
  

function getNextPalindromeDate(date)
{
    let counterForNextPalindromeDate = 0;
    let nextDate = getNextDate(date);
  
    while(1)
    {
      counterForNextPalindromeDate++;
      let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome)
      {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [counterForNextPalindromeDate, nextDate];
}

function checkBtnclickHandler()
{
    let bdayStr = dateInput.value; 
    
    if(bdayStr !== '')
    {
      let listOfDate = bdayStr.split('-'); 
  
      let date = {
                    day  : Number(listOfDate[2]),
                    month: Number(listOfDate[1]),
                    year : Number(listOfDate[0])
                 };
      
      let isPalindrome = checkPalindromeForAllDateFormats(date);
  
      if(isPalindrome)
      {
        result.innerText = 'Hooray! Your birthday is a palindrome!! 🥳';
      }
      else 
      {
        let [counterForNextPalindromeDate, nextDate] = getNextPalindromeDate(date);
  
        result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counterForNextPalindromeDate} days! 😔`;
      }
    }
}

checkBtn.addEventListener('click', checkBtnclickHandler);
