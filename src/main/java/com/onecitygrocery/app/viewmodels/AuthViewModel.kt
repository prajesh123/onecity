
package com.onecitygrocery.app.viewmodels

import androidx.lifecycle.ViewModel
import com.onecitygrocery.app.data.MockData
import com.onecitygrocery.app.models.User
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class AuthViewModel : ViewModel() {
    private val _loggedInUser = MutableStateFlow<User?>(null)
    val loggedInUser = _loggedInUser.asStateFlow()

    val availableUsers = MockData.users

    fun login(user: User) {
        _loggedInUser.value = user
    }

    fun logout() {
        _loggedInUser.value = null
    }
}
