
const ArrayElementGrouping = (inputArray) => {
    const arrayToBeSplit = inputArray[0];
    const numberOfGroups = inputArray[1];

    const isInputInvalid = InputValidator(inputArray, arrayToBeSplit, numberOfGroups);
    if (isInputInvalid) { return isInputInvalid }

    let groupedArrays = [];

    let arrayElementsPerGroup = Math.ceil(arrayToBeSplit.length/numberOfGroups);

    if (arrayElementsPerGroup === 1) {
        // returns a number of single digit arrays equal to the total length of the original array
        // also handles a requested number of groups larger than the original array length
        groupedArrays = generateGroupedArraysWithSingleRemainderGroup(arrayToBeSplit, arrayElementsPerGroup);
    } else if (numberOfGroups > Math.ceil(arrayToBeSplit.length/2)) {
        // returns a group of two digit and single digit arrays split in such a way that
        // the requested number of groups will always be matched
        groupedArrays = genrateGroupedArraysWithMultipleRemainderGroups(arrayToBeSplit, numberOfGroups);
    } else {
        // returns group of arrays with a potential smaller group equalling the remainder in
        // instances that the array cannot be equally divided by the requested group number
        groupedArrays = generateGroupedArraysWithSingleRemainderGroup(arrayToBeSplit, arrayElementsPerGroup);
    }

    return groupedArrays;
}

const generateGroupedArraysWithSingleRemainderGroup = (arrayToBeSplit, arrayElementsPerGroup) => {
    let groupedArrays = [];
    for (let i = 0; i < arrayToBeSplit.length; i += arrayElementsPerGroup) {
        const group = arrayToBeSplit.slice(i, i + arrayElementsPerGroup);
        groupedArrays.push(group)
    }
    return groupedArrays;
}

const genrateGroupedArraysWithMultipleRemainderGroups = (arrayToBeSplit, numberOfGroups) => {
    const numberOfSingleDigitGroups = (numberOfGroups - arrayToBeSplit.length/2) * 2;
    const numberOfTwoDigitGroups = numberOfGroups - numberOfSingleDigitGroups;
    let groupedArrays = [];
    for (let i = 0; i < numberOfTwoDigitGroups * 2; i += 2) {
        const group = arrayToBeSplit.slice(i, i + 2);
        groupedArrays.push(group)
    }
    for (let i = numberOfTwoDigitGroups * 2; i < arrayToBeSplit.length; i += 1) {
        const group = arrayToBeSplit.slice(i, i + 1);
        groupedArrays.push(group)
    }
    return groupedArrays;
}

const InputValidator = ( inputArray, arrayToBeSplit, numberOfGroups ) => {
    if (!inputArray || !arrayToBeSplit || !numberOfGroups) { return ThrowInvalidDataError(0) }
    else if (!arrayToBeSplit.length > 0 ) { return ThrowInvalidDataError(1) }
    else if (!numberOfGroups > 0) { return ThrowInvalidDataError(2) }
    return null;
}
const ThrowInvalidDataError = errorCode => {
    switch(errorCode) {
        case 1:
            return 'Zero length array supplied, cannot perform grouping'
        case 2:
            return 'Invalid grouping number supplied, cannot perform grouping'
        default:
        return 'Array provided in invalid format'
    }
}


let inputTestCase;


// array with no remainder group
inputTestCase = [[1, 2, 3, 4, 5, 6], 3];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');

// array with remainder group
inputTestCase = [[1, 2, 3, 4, 5, 6, 7, 8], 3];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');

// array with number of groups exceeding array length
inputTestCase = [[1, 2, 3, 4, 5], 13];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');

// arrays where number of groups requires a mixed array of two and single digit groups to meet the number of groups required
inputTestCase = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');
inputTestCase = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');


// The following test and output the error handling of incorrect data
inputTestCase = [[1, 2, 3, 4, 5, 4], 0];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');
inputTestCase = [[], 4];
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');
inputTestCase = 0;
console.log(ArrayElementGrouping(inputTestCase));
console.log('---');
