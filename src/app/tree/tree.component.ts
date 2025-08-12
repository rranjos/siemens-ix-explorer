import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

interface TreeNode {
  id: string;
  text: string;
  icon?: string;
  hasChildren?: boolean;
  children?: TreeNode[];
  context?: string;
}

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, IxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="tree-demo">
      <div class="tree-demo__header">
        <h1>Tree Examples</h1>
        <p>Display hierarchical data using tree components.</p>
      </div>

      <div class="tree-demo__content">
        <!-- Basic Tree -->
        <ix-card class="demo-card">
          <h3>Basic Tree</h3>
          <div class="basic-tree">
            <div
              class="tree-node"
              [class.tree-node--expanded]="isBasicExpanded('root')"
            >
              <div class="tree-node__content" (click)="toggleBasicNode('root')">
                <ix-icon
                  [name]="
                    isBasicExpanded('root') ? 'chevron-down' : 'chevron-right'
                  "
                  class="tree-node__toggle"
                ></ix-icon>
                <ix-icon name="home" class="tree-node__icon"></ix-icon>
                <span class="tree-node__text">Root</span>
              </div>

              <div *ngIf="isBasicExpanded('root')" class="tree-node__children">
                <!-- Folder 1 -->
                <div
                  class="tree-node tree-node--child"
                  [class.tree-node--expanded]="isBasicExpanded('folder1')"
                >
                  <div
                    class="tree-node__content"
                    (click)="toggleBasicNode('folder1')"
                  >
                    <ix-icon
                      [name]="
                        isBasicExpanded('folder1')
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      class="tree-node__toggle"
                    ></ix-icon>
                    <ix-icon name="apps" class="tree-node__icon"></ix-icon>
                    <span class="tree-node__text">Folder 1</span>
                  </div>

                  <div
                    *ngIf="isBasicExpanded('folder1')"
                    class="tree-node__children"
                  >
                    <div class="tree-node tree-node--child">
                      <div class="tree-node__content">
                        <span class="tree-node__spacer"></span>
                        <ix-icon
                          name="document"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">Document 1.1</span>
                      </div>
                    </div>
                    <div class="tree-node tree-node--child">
                      <div class="tree-node__content">
                        <span class="tree-node__spacer"></span>
                        <ix-icon
                          name="document"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">Document 1.2</span>
                      </div>
                    </div>

                    <!-- Subfolder -->
                    <div
                      class="tree-node tree-node--child"
                      [class.tree-node--expanded]="isBasicExpanded('subfolder')"
                    >
                      <div
                        class="tree-node__content"
                        (click)="toggleBasicNode('subfolder')"
                      >
                        <ix-icon
                          [name]="
                            isBasicExpanded('subfolder')
                              ? 'chevron-down'
                              : 'chevron-right'
                          "
                          class="tree-node__toggle"
                        ></ix-icon>
                        <ix-icon
                          name="hierarchy"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">Subfolder</span>
                      </div>

                      <div
                        *ngIf="isBasicExpanded('subfolder')"
                        class="tree-node__children"
                      >
                        <div class="tree-node tree-node--child">
                          <div class="tree-node__content">
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="document"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">Document 1.3.1</span>
                          </div>
                        </div>
                        <div class="tree-node tree-node--child">
                          <div class="tree-node__content">
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="document"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">Document 1.3.2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Folder 2 -->
                <div
                  class="tree-node tree-node--child"
                  [class.tree-node--expanded]="isBasicExpanded('folder2')"
                >
                  <div
                    class="tree-node__content"
                    (click)="toggleBasicNode('folder2')"
                  >
                    <ix-icon
                      [name]="
                        isBasicExpanded('folder2')
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      class="tree-node__toggle"
                    ></ix-icon>
                    <ix-icon name="apps" class="tree-node__icon"></ix-icon>
                    <span class="tree-node__text">Folder 2</span>
                  </div>

                  <div
                    *ngIf="isBasicExpanded('folder2')"
                    class="tree-node__children"
                  >
                    <div class="tree-node tree-node--child">
                      <div class="tree-node__content">
                        <span class="tree-node__spacer"></span>
                        <ix-icon
                          name="document"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">Document 2.1</span>
                      </div>
                    </div>
                    <div class="tree-node tree-node--child">
                      <div class="tree-node__content">
                        <span class="tree-node__spacer"></span>
                        <ix-icon
                          name="document"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">Document 2.2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ix-card>

        <!-- Tree with Context Menu -->
        <ix-card class="demo-card">
          <h3>Tree with Context Menu</h3>
          <p>Selected item: {{ selectedItem() || 'None' }}</p>

          <div class="project-tree">
            <div
              class="tree-node"
              [class.tree-node--expanded]="isProjectExpanded('project-root')"
            >
              <div
                class="tree-node__content"
                (click)="
                  toggleProjectNode('project-root');
                  selectProjectItem('Project Root')
                "
              >
                <ix-icon
                  [name]="
                    isProjectExpanded('project-root')
                      ? 'chevron-down'
                      : 'chevron-right'
                  "
                  class="tree-node__toggle"
                ></ix-icon>
                <ix-icon name="home" class="tree-node__icon"></ix-icon>
                <span class="tree-node__text">Project Root</span>
              </div>

              <div
                *ngIf="isProjectExpanded('project-root')"
                class="tree-node__children"
              >
                <!-- src folder -->
                <div
                  class="tree-node tree-node--child"
                  [class.tree-node--expanded]="isProjectExpanded('src')"
                >
                  <div
                    class="tree-node__content"
                    (click)="toggleProjectNode('src'); selectProjectItem('src')"
                  >
                    <ix-icon
                      [name]="
                        isProjectExpanded('src')
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      class="tree-node__toggle"
                    ></ix-icon>
                    <ix-icon name="apps" class="tree-node__icon"></ix-icon>
                    <span class="tree-node__text">src</span>
                  </div>

                  <div
                    *ngIf="isProjectExpanded('src')"
                    class="tree-node__children"
                  >
                    <!-- components folder -->
                    <div
                      class="tree-node tree-node--child"
                      [class.tree-node--expanded]="
                        isProjectExpanded('components')
                      "
                    >
                      <div
                        class="tree-node__content"
                        (click)="
                          toggleProjectNode('components');
                          selectProjectItem('components')
                        "
                      >
                        <ix-icon
                          [name]="
                            isProjectExpanded('components')
                              ? 'chevron-down'
                              : 'chevron-right'
                          "
                          class="tree-node__toggle"
                        ></ix-icon>
                        <ix-icon
                          name="hierarchy"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">components</span>
                      </div>

                      <div
                        *ngIf="isProjectExpanded('components')"
                        class="tree-node__children"
                      >
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('app.component.ts')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="cog"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text"
                              >app.component.ts</span
                            >
                          </div>
                        </div>
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('app.component.html')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="document"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text"
                              >app.component.html</span
                            >
                          </div>
                        </div>
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('app.component.scss')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="document"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text"
                              >app.component.scss</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- services folder -->
                    <div
                      class="tree-node tree-node--child"
                      [class.tree-node--expanded]="
                        isProjectExpanded('services')
                      "
                    >
                      <div
                        class="tree-node__content"
                        (click)="
                          toggleProjectNode('services');
                          selectProjectItem('services')
                        "
                      >
                        <ix-icon
                          [name]="
                            isProjectExpanded('services')
                              ? 'chevron-down'
                              : 'chevron-right'
                          "
                          class="tree-node__toggle"
                        ></ix-icon>
                        <ix-icon
                          name="hierarchy"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">services</span>
                      </div>

                      <div
                        *ngIf="isProjectExpanded('services')"
                        class="tree-node__children"
                      >
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('data.service.ts')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="cog"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">data.service.ts</span>
                          </div>
                        </div>
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('auth.service.ts')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="cog"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">auth.service.ts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- assets folder -->
                <div
                  class="tree-node tree-node--child"
                  [class.tree-node--expanded]="isProjectExpanded('assets')"
                >
                  <div
                    class="tree-node__content"
                    (click)="
                      toggleProjectNode('assets'); selectProjectItem('assets')
                    "
                  >
                    <ix-icon
                      [name]="
                        isProjectExpanded('assets')
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      class="tree-node__toggle"
                    ></ix-icon>
                    <ix-icon name="apps" class="tree-node__icon"></ix-icon>
                    <span class="tree-node__text">assets</span>
                  </div>

                  <div
                    *ngIf="isProjectExpanded('assets')"
                    class="tree-node__children"
                  >
                    <!-- images folder -->
                    <div
                      class="tree-node tree-node--child"
                      [class.tree-node--expanded]="isProjectExpanded('images')"
                    >
                      <div
                        class="tree-node__content"
                        (click)="
                          toggleProjectNode('images');
                          selectProjectItem('images')
                        "
                      >
                        <ix-icon
                          [name]="
                            isProjectExpanded('images')
                              ? 'chevron-down'
                              : 'chevron-right'
                          "
                          class="tree-node__toggle"
                        ></ix-icon>
                        <ix-icon
                          name="hierarchy"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">images</span>
                      </div>

                      <div
                        *ngIf="isProjectExpanded('images')"
                        class="tree-node__children"
                      >
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('logo.png')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="calendar"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">logo.png</span>
                          </div>
                        </div>
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('background.jpg')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="calendar"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">background.jpg</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- styles folder -->
                    <div
                      class="tree-node tree-node--child"
                      [class.tree-node--expanded]="isProjectExpanded('styles')"
                    >
                      <div
                        class="tree-node__content"
                        (click)="
                          toggleProjectNode('styles');
                          selectProjectItem('styles')
                        "
                      >
                        <ix-icon
                          [name]="
                            isProjectExpanded('styles')
                              ? 'chevron-down'
                              : 'chevron-right'
                          "
                          class="tree-node__toggle"
                        ></ix-icon>
                        <ix-icon
                          name="hierarchy"
                          class="tree-node__icon"
                        ></ix-icon>
                        <span class="tree-node__text">styles</span>
                      </div>

                      <div
                        *ngIf="isProjectExpanded('styles')"
                        class="tree-node__children"
                      >
                        <div class="tree-node tree-node--child">
                          <div
                            class="tree-node__content"
                            (click)="selectProjectItem('main.scss')"
                          >
                            <span class="tree-node__spacer"></span>
                            <ix-icon
                              name="document"
                              class="tree-node__icon"
                            ></ix-icon>
                            <span class="tree-node__text">main.scss</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Root files -->
                <div class="tree-node tree-node--child">
                  <div
                    class="tree-node__content"
                    (click)="selectProjectItem('package.json')"
                  >
                    <span class="tree-node__spacer"></span>
                    <ix-icon name="document" class="tree-node__icon"></ix-icon>
                    <span class="tree-node__text">package.json</span>
                  </div>
                </div>
                <div class="tree-node tree-node--child">
                  <div
                    class="tree-node__content"
                    (click)="selectProjectItem('README.md')"
                  >
                    <span class="tree-node__spacer"></span>
                    <ix-icon name="document" class="tree-node__icon"></ix-icon>
                    <span class="tree-node__text">README.md</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="selectedItem()" class="item-details">
            <h4>Item Details</h4>
            <p><strong>Name:</strong> {{ selectedItem() }}</p>
            <p><strong>Type:</strong> {{ getItemType(selectedItem()!) }}</p>
            <div class="item-actions">
              <ix-button variant="primary" size="small">Edit</ix-button>
              <ix-button variant="secondary" size="small">Copy</ix-button>
              <ix-button variant="ghost" size="small">Delete</ix-button>
            </div>
          </div>
        </ix-card>

        <!-- Dynamic Tree -->
        <ix-card class="demo-card">
          <h3>Dynamic Tree</h3>
          <div class="tree-controls">
            <ix-button variant="primary" size="small" (click)="addNode()">
              Add Node
            </ix-button>
            <ix-button variant="secondary" size="small" (click)="expandAll()">
              Expand All
            </ix-button>
            <ix-button variant="secondary" size="small" (click)="collapseAll()">
              Collapse All
            </ix-button>
          </div>

          <div class="custom-tree">
            <div
              *ngFor="let node of treeData()"
              class="tree-node"
              [class.tree-node--expanded]="isExpanded(node.id)"
            >
              <div class="tree-node__content" (click)="toggleNode(node.id)">
                <ix-icon
                  *ngIf="node.hasChildren"
                  [name]="
                    isExpanded(node.id) ? 'chevron-down' : 'chevron-right'
                  "
                  class="tree-node__toggle"
                >
                </ix-icon>
                <ix-icon
                  [name]="getNodeIcon(node)"
                  class="tree-node__icon"
                ></ix-icon>
                <span class="tree-node__text">{{ node.text }}</span>
                <ix-button
                  variant="ghost"
                  size="small"
                  class="tree-node__action"
                  (click)="removeNode(node.id, $event)"
                >
                  <ix-icon name="close"></ix-icon>
                </ix-button>
              </div>

              <div
                *ngIf="node.children && isExpanded(node.id)"
                class="tree-node__children"
              >
                <div
                  *ngFor="let child of node.children"
                  class="tree-node tree-node--child"
                >
                  <div class="tree-node__content">
                    <ix-icon
                      [name]="getNodeIcon(child)"
                      class="tree-node__icon"
                    ></ix-icon>
                    <span class="tree-node__text">{{ child.text }}</span>
                    <ix-button
                      variant="ghost"
                      size="small"
                      class="tree-node__action"
                      (click)="removeChildNode(node.id, child.id, $event)"
                    >
                      <ix-icon name="close"></ix-icon>
                    </ix-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ix-card>

        <!-- Tree with Checkboxes -->
        <ix-card class="demo-card">
          <h3>Tree with Selection</h3>
          <p>Selected items: {{ getSelectedCount() }}</p>

          <div class="selection-controls">
            <ix-button variant="outline" size="small" (click)="selectAll()">
              Select All
            </ix-button>
            <ix-button variant="outline" size="small" (click)="selectNone()">
              Select None
            </ix-button>
          </div>

          <div class="checkbox-tree">
            <div *ngFor="let item of checkboxItems()" class="checkbox-item">
              <ix-checkbox
                [checked]="item.selected"
                (checkedChange)="onItemSelectionChange(item.id, $event)"
              >
                {{ item.label }}
              </ix-checkbox>

              <div *ngIf="item.children" class="checkbox-item__children">
                <div
                  *ngFor="let child of item.children"
                  class="checkbox-item checkbox-item--child"
                >
                  <ix-checkbox
                    [checked]="child.selected"
                    (checkedChange)="
                      onChildSelectionChange(item.id, child.id, $event)
                    "
                  >
                    {{ child.label }}
                  </ix-checkbox>
                </div>
              </div>
            </div>
          </div>
        </ix-card>
      </div>
    </div>
  `,
  styles: [
    `
      .tree-demo {
        padding: 1.5rem;

        &__header {
          margin-bottom: 2rem;

          h1 {
            color: var(--ix-color-primary);
            margin-bottom: 0.5rem;
          }

          p {
            color: var(--ix-color-text-secondary);
            margin: 0;
          }
        }

        &__content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
      }

      .demo-card {
        padding: 1.5rem;

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--ix-color-primary);
        }

        p {
          margin-bottom: 1rem;
          color: var(--ix-color-text-secondary);
        }
      }

      .item-details {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--ix-color-neutral-10);
        border-radius: 4px;

        h4 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: var(--ix-color-primary);
        }

        p {
          margin: 0.25rem 0;
        }
      }

      .item-actions {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
      }

      .tree-controls {
        margin-bottom: 1rem;
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .custom-tree {
        border: 1px solid var(--ix-color-neutral-30);
        border-radius: 4px;
        padding: 0.5rem;
      }

      .basic-tree,
      .project-tree {
        border: 1px solid var(--ix-color-neutral-30);
        border-radius: 4px;
        padding: 0.5rem;
        margin-bottom: 1rem;
      }

      .tree-node {
        &__content {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          position: relative;

          &:hover {
            background: var(--ix-color-neutral-20);

            .tree-node__action {
              opacity: 1;
            }
          }
        }

        &__toggle {
          margin-right: 0.5rem;
          color: var(--ix-color-text-secondary);
          cursor: pointer;
        }

        &__spacer {
          width: 1.5rem;
          display: inline-block;
        }

        &__icon {
          margin-right: 0.75rem;
          color: var(--ix-color-primary);
        }

        &__text {
          flex: 1;
          font-weight: 500;
        }

        &__action {
          opacity: 0;
          transition: opacity 0.2s;
          margin-left: 0.5rem;
        }

        &__children {
          margin-left: 1.5rem;
          border-left: 1px solid var(--ix-color-neutral-30);
          padding-left: 0.5rem;
        }

        &--child {
          .tree-node__text {
            font-weight: normal;
          }
        }
      }

      .selection-controls {
        margin-bottom: 1rem;
        display: flex;
        gap: 0.75rem;
      }

      .checkbox-tree {
        padding: 0.5rem;
      }

      .checkbox-item {
        margin-bottom: 0.75rem;

        &__children {
          margin-left: 1.5rem;
          margin-top: 0.5rem;
          border-left: 1px solid var(--ix-color-neutral-30);
          padding-left: 1rem;
        }

        &--child {
          margin-bottom: 0.5rem;
        }
      }
    `,
  ],
})
export class TreeComponent {
  selectedItem = signal<string | null>(null);
  expandedNodes = signal<Set<string>>(new Set(['root', 'folder-1']));

  // Basic tree state
  basicExpandedNodes = signal<Set<string>>(new Set(['root']));

  // Project tree state
  projectExpandedNodes = signal<Set<string>>(new Set(['project-root', 'src']));

  private nodeCounter = 4;

  treeData = signal<TreeNode[]>([
    {
      id: 'root',
      text: 'Root Folder',
      icon: 'home',
      hasChildren: true,
      children: [
        { id: 'file-1', text: 'Document 1.txt', icon: 'document' },
        { id: 'file-2', text: 'Image 1.png', icon: 'calendar' },
      ],
    },
    {
      id: 'folder-1',
      text: 'Projects',
      icon: 'apps',
      hasChildren: true,
      children: [
        { id: 'project-1', text: 'Project Alpha', icon: 'cog' },
        { id: 'project-2', text: 'Project Beta', icon: 'cog' },
      ],
    },
    {
      id: 'folder-2',
      text: 'Archives',
      icon: 'hierarchy',
      hasChildren: false,
    },
  ]);

  checkboxItems = signal([
    {
      id: 'cat-1',
      label: 'Development',
      selected: false,
      children: [
        { id: 'cat-1-1', label: 'Frontend', selected: false },
        { id: 'cat-1-2', label: 'Backend', selected: true },
        { id: 'cat-1-3', label: 'DevOps', selected: false },
      ],
    },
    {
      id: 'cat-2',
      label: 'Design',
      selected: true,
      children: [
        { id: 'cat-2-1', label: 'UI Design', selected: true },
        { id: 'cat-2-2', label: 'UX Research', selected: false },
      ],
    },
    {
      id: 'cat-3',
      label: 'Marketing',
      selected: false,
      children: [
        { id: 'cat-3-1', label: 'Content', selected: false },
        { id: 'cat-3-2', label: 'Social Media', selected: false },
      ],
    },
  ]);

  onSelectionChange(event: any) {
    this.selectedItem.set(event.detail);
  }

  // Basic tree methods
  isBasicExpanded(nodeId: string): boolean {
    return this.basicExpandedNodes().has(nodeId);
  }

  toggleBasicNode(nodeId: string) {
    const expanded = new Set(this.basicExpandedNodes());
    if (expanded.has(nodeId)) {
      expanded.delete(nodeId);
    } else {
      expanded.add(nodeId);
    }
    this.basicExpandedNodes.set(expanded);
  }

  // Project tree methods
  isProjectExpanded(nodeId: string): boolean {
    return this.projectExpandedNodes().has(nodeId);
  }

  toggleProjectNode(nodeId: string) {
    const expanded = new Set(this.projectExpandedNodes());
    if (expanded.has(nodeId)) {
      expanded.delete(nodeId);
    } else {
      expanded.add(nodeId);
    }
    this.projectExpandedNodes.set(expanded);
  }

  selectProjectItem(itemName: string) {
    this.selectedItem.set(itemName);
  }

  getItemType(itemName: string): string {
    if (itemName.includes('.ts')) return 'TypeScript';
    if (itemName.includes('.html')) return 'HTML';
    if (itemName.includes('.scss')) return 'SCSS';
    if (itemName.includes('.json')) return 'JSON';
    if (itemName.includes('.md')) return 'Markdown';
    if (itemName.includes('.png') || itemName.includes('.jpg')) return 'Image';
    return 'Folder';
  }

  isExpanded(nodeId: string): boolean {
    return this.expandedNodes().has(nodeId);
  }

  toggleNode(nodeId: string) {
    const expanded = new Set(this.expandedNodes());
    if (expanded.has(nodeId)) {
      expanded.delete(nodeId);
    } else {
      expanded.add(nodeId);
    }
    this.expandedNodes.set(expanded);
  }

  getNodeIcon(node: TreeNode): string {
    return node.icon || 'document';
  }

  addNode() {
    this.nodeCounter++;
    const newNode: TreeNode = {
      id: `node-${this.nodeCounter}`,
      text: `New Node ${this.nodeCounter}`,
      icon: 'document',
      hasChildren: false,
    };

    const current = this.treeData();
    this.treeData.set([...current, newNode]);
  }

  removeNode(nodeId: string, event: Event) {
    event.stopPropagation();
    const current = this.treeData();
    const updated = current.filter((node) => node.id !== nodeId);
    this.treeData.set(updated);
  }

  removeChildNode(parentId: string, childId: string, event: Event) {
    event.stopPropagation();
    const current = this.treeData();
    const updated = current.map((node) => {
      if (node.id === parentId && node.children) {
        return {
          ...node,
          children: node.children.filter((child) => child.id !== childId),
        };
      }
      return node;
    });
    this.treeData.set(updated);
  }

  expandAll() {
    const allNodeIds = new Set<string>();
    this.treeData().forEach((node) => {
      if (node.hasChildren) {
        allNodeIds.add(node.id);
      }
    });
    this.expandedNodes.set(allNodeIds);
  }

  collapseAll() {
    this.expandedNodes.set(new Set());
  }

  getSelectedCount(): number {
    let count = 0;
    this.checkboxItems().forEach((item) => {
      if (item.selected) count++;
      if (item.children) {
        count += item.children.filter((child) => child.selected).length;
      }
    });
    return count;
  }

  onItemSelectionChange(itemId: string, event: any) {
    const selected = event.detail;
    const current = this.checkboxItems();
    const updated = current.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          selected,
          children: item.children?.map((child) => ({ ...child, selected })),
        };
      }
      return item;
    });
    this.checkboxItems.set(updated);
  }

  onChildSelectionChange(parentId: string, childId: string, event: any) {
    const selected = event.detail;
    const current = this.checkboxItems();
    const updated = current.map((item) => {
      if (item.id === parentId && item.children) {
        const updatedChildren = item.children.map((child) =>
          child.id === childId ? { ...child, selected } : child
        );
        const allSelected = updatedChildren.every((child) => child.selected);
        return {
          ...item,
          selected: allSelected,
          children: updatedChildren,
        };
      }
      return item;
    });
    this.checkboxItems.set(updated);
  }

  selectAll() {
    const current = this.checkboxItems();
    const updated = current.map((item) => ({
      ...item,
      selected: true,
      children: item.children?.map((child) => ({ ...child, selected: true })),
    }));
    this.checkboxItems.set(updated);
  }

  selectNone() {
    const current = this.checkboxItems();
    const updated = current.map((item) => ({
      ...item,
      selected: false,
      children: item.children?.map((child) => ({ ...child, selected: false })),
    }));
    this.checkboxItems.set(updated);
  }
}
