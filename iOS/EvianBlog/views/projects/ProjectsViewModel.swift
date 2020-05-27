//
//  ProjectsViewModel.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import Foundation
import UIKit
import Combine

class ProjectsViewModel: ObservableObject {
	@Published var projects: [Project] = []
	@Published var fetchStatus: FetchStatus = .success
	
	enum FetchStatus {
		case fetching
		case success
		case failure
	}
	
	private let blogAPI: BlogAPI
	// used to store `AnyCancellable`, without keeping this reference alive, the network publisher will terminate immediately
	private var disposables = Set<AnyCancellable>()
	
	init(blogAPI: BlogAPI) {
		self.blogAPI = blogAPI
	}
	
	func fetchProjects() {
		guard self.fetchStatus != .fetching else { return }
		
		self.fetchStatus = .fetching
		self.blogAPI.getProjects()
			.receive(on: DispatchQueue.main)
			.sink(receiveCompletion: { [weak self] completion in
				guard let self = self else { return }
				switch completion {
					case .finished:
						self.fetchStatus = .success
					case .failure(let blogAPIError):
						print("fetch failure: \(blogAPIError)")
						self.fetchStatus = .failure
				}
			}) { [weak self] projects in
				guard let self = self else { return }
				self.projects = projects
		}
		.store(in: &self.disposables)
	}
	
	func onProjectPressed(projectURL: URL) {
		UIApplication.shared.open(projectURL)
	}
}
