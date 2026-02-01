
package com.onecitygrocery.app.models

data class User(
    val id: String,
    val name: String,
    val role: String
)

data class Product(
    val id: String,
    val name: String,
    val price: Double,
    val imageUrl: String,
    val unit: String
)
