/**
 *
 * @param {String} text - Time Option
 * @return {String for Optime Time}
 */
 export function formatTimeReduce(option) {
    switch (option[0].label){
        case 'Day':
          return "YYYY-MM-DD"
        case 'Month':
          return "YYYY-MM"
        case 'Year':
          return "YYYY"
      }
    return "YYYY-MM-DD"
  }