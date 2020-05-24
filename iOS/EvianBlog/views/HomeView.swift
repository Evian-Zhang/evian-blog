//
//  ContentView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/17.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct HomeView: View {
	// Currently switching between tabs can't reserve scrolling position of one tab. see https://stackoverflow.com/q/57772137/10005095 and https://stackoverflow.com/q/59295676/10005095
    var body: some View {
		TabView {
			WritingsView(writingsViewModel: WritingsViewModel(blogAPI: BlogAPI()))
				.tabItem {
					Image(systemName: "pencil")
					Text("Writings")
				}
			Text("Another Tab")
				.tabItem {
					Image(systemName: "keyboard")
					Text("Projects")
				}
			Text("The Last Tab")
				.tabItem {
					Image(systemName: "person")
					Text("Résumé")
				}
		}
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
