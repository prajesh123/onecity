
package com.onecitygrocery.app.navigation

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.onecitygrocery.app.screens.LoginScreen
import com.onecitygrocery.app.screens.customer.CustomerDashboardScreen
import com.onecitygrocery.app.screens.delivery.DeliveryDashboardScreen
import com.onecitygrocery.app.screens.manager.ManagerDashboardScreen
import com.onecitygrocery.app.screens.owner.OwnerDashboardScreen
import com.onecitygrocery.app.screens.worker.WorkerDashboardScreen
import com.onecitygrocery.app.viewmodels.AuthViewModel

@Composable
fun AppNavigator(navController: NavHostController) {
    val authViewModel: AuthViewModel = viewModel()
    
    NavHost(navController = navController, startDestination = "login") {
        composable("login") {
            LoginScreen(
                onLoginSuccess = { user ->
                    val destination = when(user.role) {
                        "Customer" -> "customer_dashboard"
                        "Delivery Partner" -> "delivery_dashboard"
                        "Worker" -> "worker_dashboard"
                        "Manager" -> "manager_dashboard"
                        "Owner" -> "owner_dashboard"
                        else -> "login"
                    }
                    navController.navigate(destination) {
                        popUpTo("login") { inclusive = true }
                    }
                },
                authViewModel = authViewModel
            )
        }
        composable("customer_dashboard") { CustomerDashboardScreen() }
        composable("delivery_dashboard") { DeliveryDashboardScreen() }
        composable("worker_dashboard") { WorkerDashboardScreen() }
        composable("manager_dashboard") { ManagerDashboardScreen() }
        composable("owner_dashboard") { OwnerDashboardScreen() }
    }
}
