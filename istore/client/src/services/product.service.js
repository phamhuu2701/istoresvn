export default function getAvgRatesProduct(product) {
    let sumStars = 0;
    let ratesCount = 0;
    if (product.rates.length > 0) {
        product.rates.map((rate, key) => {
            if (rate.stars > 0) {
                sumStars += rate.stars;
                ratesCount++;
            }
            return null;
        });

        if (ratesCount > 0) {
            // console.log(sumStars / ratesCount);
            return sumStars / ratesCount;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

export function getViewsCountByTime(
    products,
    year1,
    month1,
    date1,
    year2,
    month2,
    date2
) {
    // console.log(products);
    let viewsCount = 0;
    if (products.length > 0) {
        let monthStr1 = "";
        if (month1 < 10) {
            monthStr1 = "0" + month1;
        }
        else{
            monthStr1 = month1;
        }
        let dateStr1 = "";
        if (date1 < 10) {
            dateStr1 = "0" + date1;
        }
        else{
            dateStr1 = date1;
        }
        let time1 = "" + year1 + "-" + monthStr1 + "-" + dateStr1;
        // console.log("time1: " + time1);

        let monthStr2 = "";
        if (month2 < 10) {
            monthStr2 = "0" + month2;
        }
        else{
            monthStr2 = month2;
        }
        let dateStr2 = "";
        if (date2 < 10) {
            dateStr2 = "0" + date2;
        }
        else{
            dateStr2 = date2;
        }
        let time2 = "" + year2 + "-" + monthStr2 + "-" + dateStr2;
        // console.log("time2: " + time2);

        products.map((product, key) => {
            if (product.viewsCount.length > 0) {
                product.viewsCount.map((view, key) => {
                    // console.log(view);
                    if (
                        time1.localeCompare(view) === 0 ||
                        time2.localeCompare(view) === 0 ||
                        (time1.localeCompare(view) === -1 &&
                        time2.localeCompare(view) === 1)
                    ) {
                        viewsCount++;
                    }

                    return null;
                });
            }

            return null;
        });

        // console.log(viewsCount);
        return viewsCount;
    } else {
        return 0;
    }
}

export function getProducts(callback) {
    fetch("/api/products/")
        .then(res => res.json())
        .then(results => {
            callback(results);
        })
        .catch(err => console.log(err));
}