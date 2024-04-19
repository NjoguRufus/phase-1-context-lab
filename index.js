// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to add a timeIn event to an employee's record
function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

// Function to add a timeOut event to an employee's record
function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employee;
}

// Function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

// Function to calculate wages earned on a specific date for an employee
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
}

// Function to calculate all wages for an employee
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const wages = dates.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
    return wages;
}

// Function to find an employee by first name in a collection
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
}

// Function to calculate the payroll burden
function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
    return totalPayroll;
}
