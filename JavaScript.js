(function () {
    var products = [
        {
            "ProductID": 1,
            "ProductName": "Chai",
            "UnitPrice": 18,
            "UnitsInStock": 39,
            "DeliveryOn": new Date(1996, 8, 20)
        },
        {
            "ProductID": 2,
            "ProductName": "Chang",
            "UnitPrice": 19,
            "UnitsInStock": 17,
            "DeliveryOn": new Date(1996, 7, 12)
        },
        {
            "ProductID": 3,
            "ProductName": "Aniseed Syrup",
            "UnitPrice": 10,
            "UnitsInStock": 0,
            "DeliveryOn": new Date(1996, 8, 26)
        },
        {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "UnitPrice": 22,
            "UnitsInStock": 53,
            "DeliveryOn": new Date(1996, 9, 19)
        },
        {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "UnitPrice": 21.35,
            "UnitsInStock": 0,
            "DeliveryOn": new Date(1996, 7, 17)
        },
        {
            "ProductID": 6,
            "ProductName": "Grandma's Boysenberry Spread",
            "UnitPrice": 25,
            "UnitsInStock": 120,
            "DeliveryOn": new Date(1996, 9, 19)
        },
        {
            "ProductID": 7,
            "ProductName": "Uncle Bob's Organic Dried Pears",
            "UnitPrice": 30,
            "UnitsInStock": 0,
            "DeliveryOn": new Date(1996, 7, 22)
        },
        {
            "ProductID": 8,
            "ProductName": "Northwoods Cranberry Sauce",
            "UnitPrice": 40,
            "UnitsInStock": 0,
            "DeliveryOn": new Date(1996, 11, 1)
        },
        {
            "ProductID": 9,
            "ProductName": "Mishi Kobe Niku",
            "UnitPrice": 97,
            "UnitsInStock": 29,
            "DeliveryOn": new Date(1997, 1, 21)
        },
        {
            "ProductID": 10,
            "ProductName": "Ikura",
            "UnitPrice": 31,
            "UnitsInStock": 31,
            "DeliveryOn": new Date(1996, 8, 5)
        }
    ];
    var listOfProducts = document.getElementById('ProductList');
    function processRow(product) {
        let tableRow = document.createElement('tr');
        for (let prop in product) {
            let tableCell = document.createElement('td');
            tableCell.classList.add(prop.toString());
            if (prop == 'UnitPrice') {
                tableCell.innerHTML = "" + product[prop].toFixed(2) + " BGN";
            }
            else if (prop == 'DeliveryOn') {
                let customDateFormat;
                let deliveryDate = product[prop];
                customDateFormat = deliveryDate.getDate().toString().padStart(2, '0') + "." +
                    deliveryDate.getMonth().toString().padStart(2, '0') + "." +
                    deliveryDate.getFullYear();
                tableCell.innerHTML = customDateFormat;
            }
            else {
                if (prop == 'UnitsInStock' && product[prop] == 0) {
                    tableRow.classList.add('outOfProduct');
                }
                tableCell.innerHTML = product[prop];
            }
            tableRow.appendChild(tableCell);
        }
        return tableRow;
    }

    function drawProductInfo(product) {
        var container = document.createElement('div');
        var infoTable = document.createElement('table');
        for (var prop in product) {
            var row = document.createElement('tr');
            var propName = document.createElement('td');
            var propValue = document.createElement('td');
            propName.classList.add("propertyNames");
            propValue.classList.add("propertyValues");
            propName.innerHTML = prop.toString() + ": ";
            if (prop == 'UnitPrice') {
                propValue.innerHTML = "" + product[prop].toFixed(2) + " BGN";
            }
            else if (prop == 'DeliveryOn') {
                let customDateFormat;
                let deliveryDate = product[prop];
                customDateFormat = deliveryDate.getDate().toString().padStart(2, '0') + "." +
                    deliveryDate.getMonth().toString().padStart(2, '0') + "." +
                    deliveryDate.getFullYear();
                propValue.innerHTML = customDateFormat;
            }
            else {
                propValue.innerHTML = product[prop];
            }
            row.appendChild(propName);
            row.appendChild(propValue);
            infoTable.appendChild(row);
        }
        container.appendChild(infoTable);

        container.classList.add('productContainer');
        return container;

    }
    function getProductById(id) {
        for (let i = 0, len = products.length; i < len; i++) {
            if (products[i].ProductID == id) {
                return products[i];
            }
        }
    }

    for (let i = 0, len = products.length; i < len; i++) {
        let tableRow = processRow(products[i]);
        listOfProducts.appendChild(tableRow);
    };

    (function addRowHandlers() {
        var table = document.getElementById("ProductTable");
        var rows = table.getElementsByTagName("tr");
        for (i = 1; i < rows.length; i++) {
            row = table.rows[i];
            row.onclick = function () {
                table.classList.add('blurred');

                var disabledBackground = document.createElement('div');
                disabledBackground.classList.add('disabled-background');
                document.body.appendChild(disabledBackground);

                var cell = this.getElementsByTagName("td")[0];
                var id = cell.innerHTML;
                var product = getProductById(id);
                var container = drawProductInfo(product);
                document.body.appendChild(container);

                container.onclick = function () {
                    container.remove();
                    disabledBackground.remove();
                    table.classList.remove('blurred');
                }
            };
        }
    }());
}())