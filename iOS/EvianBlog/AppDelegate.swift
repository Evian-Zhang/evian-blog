//
//  AppDelegate.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/17.
//  Copyright © 2020 Evian张. All rights reserved.
//

import UIKit
import SwiftUI

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
	
	var window: UIWindow?


	func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
		if #available(iOS 13, *) {
			
		} else {
			let homeView = HomeView()
			
			let window = UIWindow(frame: UIScreen.main.bounds)
			window.rootViewController = UIHostingController(rootView: homeView)
			self.window = window
			window.makeKeyAndVisible()
		}
		
		return true
	}

	// MARK: UISceneSession Lifecycle
	
	@available(iOS 13.0, *)
	func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
		// Called when a new scene session is being created.
		// Use this method to select a configuration to create the new scene with.
		return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
	}

	@available(iOS 13.0, *)
	func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
		// Called when the user discards a scene session.
		// If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
		// Use this method to release any resources that were specific to the discarded scenes, as they will not return.
	}


}

