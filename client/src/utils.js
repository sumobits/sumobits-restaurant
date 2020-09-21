/**
 * @format
 */

export const initCaps = val => {
    if (Array.isArray(val)) {
        let vals = [];

        vals.forEach(v => {
            vals.push(v.charAt(0).toUpperCase() + v.slice(1));
        })

        return vals;
    }
    else {
        return val.charAt(0).toUpperCase() + val.slice(1);
    }
};

export const getObjectPropertyValues = (obj, prop) => {
    let props = [];

    Object.keys(obj).forEach(key => {
        if (obj.hasOwnProperty(key)) {
            if (key === prop) {
                props.push(obj[key]);
            }
        }
    });

    return props;
};

export const collectProps = (sortedArray, prop) => {
    let props = [];

    sortedArray.forEach(entry => {
        Object.keys(entry).forEach(key => {
            if (entry.hasOwnProperty(key)) {
                if (key === prop) {
                    props.push(entry[key]);
                }
            }
        });
    });

    return props;
};

export const dedupeArray = array => {
    if (!array) return [];

    let unique = [];

    array.forEach(val => {
        if (!unique.includes(val)) {
            unique.push(val);
        }
    });

    return unique;
};

export const sortObjectByProp = prop => {
    return (obj1, obj2) => {
        const val1 = obj1[prop].toUpperCase();
        const val2 = obj2[prop].toUpperCase();

        if (val1 < val2) {
            return -1;
        }
        else if (val1 > val2) {
            return 1;
        }
        else {
            return 0;
        }
    };
};
