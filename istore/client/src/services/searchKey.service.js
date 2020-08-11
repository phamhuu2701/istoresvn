export default function getSearchKeys(callback) {
    fetch("/api/search-keys")
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}

export function getSearchKeysCount(callback) {
    fetch("/api/search-keys")
        .then(res => res.json())
        .then(results => {
            if (results.length > 0) {
                let count = 0;
                for (let i = 0; i < results.length; i++) {
                    count += results[i].count.length;
                }
                callback(count);
            } else {
                callback(0);
            }
        })
        .catch(err => console.log(err));
}

export function getSearchCountByTime(
    searchKeys,
    year1,
    month1,
    date1,
    year2,
    month2,
    date2
) {
    let searchCount = 0;
    if (searchKeys.length > 0) {
        let monthStr1 = "";
        if (month1 < 10) {
            monthStr1 = "0" + month1;
        } else {
            monthStr1 = month1;
        }
        let dateStr1 = "";
        if (date1 < 10) {
            dateStr1 = "0" + date1;
        } else {
            dateStr1 = date1;
        }
        let time1 = "" + year1 + "-" + monthStr1 + "-" + dateStr1;
        // console.log("time1: " + time1);

        let monthStr2 = "";
        if (month2 < 10) {
            monthStr2 = "0" + month2;
        } else {
            monthStr2 = month2;
        }
        let dateStr2 = "";
        if (date2 < 10) {
            dateStr2 = "0" + date2;
        } else {
            dateStr2 = date2;
        }
        let time2 = "" + year2 + "-" + monthStr2 + "-" + dateStr2;
        // console.log("time2: " + time2);

        searchKeys.map((searchKey, key) => {
            if (searchKey.count.length > 0) {
                searchKey.count.map((view, key) => {
                    // console.log(view);
                    if (
                        time1.localeCompare(view) === 0 ||
                        time2.localeCompare(view) === 0 ||
                        (time1.localeCompare(view) === -1 &&
                            time2.localeCompare(view) === 1)
                    ) {
                        searchCount++;
                    }

                    return null;
                });
            }

            return null;
        });
        return searchCount;
    } else {
        return 0;
    }
}
