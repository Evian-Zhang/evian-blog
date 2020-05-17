//
//  ContentView.swift
//  EvianBlog
//
//  Created by Evian张 on 2020/5/17.
//  Copyright © 2020 Evian张. All rights reserved.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
		TabView {
			Text("The First Tab")
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
					Text("résumé")
				}
		}
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
