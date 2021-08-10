import {trim, parseInt, isEmpty} from 'lodash';

const MediaMarktNumeric = 1;
const SaturnNumeric = 2;

/**
 * Reads the sales division as a number as 1 for MediaMarkt and 2 for Saturn.
 * @param salesDivision
 * @returns {number}
 */
const getSalesDivisionNumeric = salesDivision => {
    let sdNumeric = 0;
    const sd = trim(salesDivision);
    if (!isEmpty(sd)) {
        sdNumeric = parseInt(sd);
    }
    return sdNumeric;
}

/**
 * Validates whether this store has sales division MediaMarktNumeric.
 * @param store
 * @returns {boolean}
 */
const isMM = store => {
    return getSalesDivisionNumeric(store) === MediaMarktNumeric;
}

/**
 * Validates whether this store has sales division SaturnNumeric.
 * @param store
 * @returns {boolean}
 */
const isSE = store => {
    return getSalesDivisionNumeric(store) === SaturnNumeric;
}


const getSDName = (store) => {
    if (isMM(store))
        return "MM";

    if (isSE(store))
        return "SE";

    return "";
};

const SalesDivisionService = {
    getSDName
};

export default SalesDivisionService;