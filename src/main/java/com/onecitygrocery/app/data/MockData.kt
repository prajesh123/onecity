
package com.onecitygrocery.app.data

import com.onecitygrocery.app.models.Product
import com.onecitygrocery.app.models.User

object MockData {
    val users = listOf(
        User(id = "1", name = "Customer Chris", role = "Customer"),
        User(id = "2", name = "Delivery Dave", role = "Delivery Partner"),
        User(id = "3", name = "Worker Wendy", role = "Worker"),
        User(id = "4", name = "Manager Mike", role = "Manager"),
        User(id = "5", name = "Owner Olivia", role = "Owner")
    )

    val products = listOf(
        Product(id = "p1", name = "Organic Apples", price = 2.50, imageUrl = "", unit = "kg"),
        Product(id = "p2", name = "Whole Milk", price = 1.50, imageUrl = "", unit = "litre"),
        Product(id = "p3", name = "Sourdough Bread", price = 4.00, imageUrl = "", unit = "loaf"),
        Product(id = "p4", name = "Free-range Eggs", price = 3.00, imageUrl = "", unit = "dozen")
    )
}
