//
//  ProjectsView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/27.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct ProjectsView: View {
	@ObservedObject var viewModel: ProjectsViewModel
	
	init(projectsViewModel: ProjectsViewModel) {
		self.viewModel = projectsViewModel
		
		self.viewModel.fetchProjects()
	}
	
	var successBody: some View {
		ScrollView {
			VStack(spacing: 10) {
				ForEach(self.viewModel.projects, id: \.name) { project in
					ScrollView {
						VStack {
							Button(action: {
								self.viewModel.onProjectPressed(projectURL: project.url)
							}) {
								Text(project.name)
									.font(.headline)
									.fixedSize(horizontal: false, vertical: true)
							}
							Text(project.description)
								.font(.subheadline)
								.fixedSize(horizontal: false, vertical: true)
							if !project.languages.isEmpty {
								Text("Languages: \(project.languages.joined(separator: ", "))")
							}
							if !project.frameworks.isEmpty {
								Text("Frameworks: \(project.frameworks.joined(separator: ", "))")
							}
						}
					}
					.frame(width: 300, height: 200)
					.overlay(RoundedRectangle(cornerRadius: 15).stroke(lineWidth: 2))
				}
			}
		}
	}
	
	func indicatorOf(fetchStatus: ProjectsViewModel.FetchStatus) -> AnyView {
		switch fetchStatus {
			case .fetching: return AnyView(Text("Loading...").font(.largeTitle))
			case .success: return AnyView(self.successBody)
			case .failure: return AnyView(VStack {
				Text("Failed to request.")
				Button("Reload", action: self.viewModel.fetchProjects)
					.buttonStyle(BorderlessButtonStyle())
			}.font(.largeTitle))
		}
	}
	
	var body: some View {
		self.indicatorOf(fetchStatus: self.viewModel.fetchStatus)
	}
}

struct ProjectsView_Previews: PreviewProvider {
    static var previews: some View {
        ProjectsView(projectsViewModel: ProjectsViewModel(blogAPI: BlogAPI()))
    }
}
