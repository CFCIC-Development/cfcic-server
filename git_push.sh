#!/bin/bash

# check the current branch
current_branch=$(git branch | grep \* | cut -d ' ' -f2)

# show the current branch
echo -e "You are currently on branch: \e[0;32m$current_branch\e[0m"
# Prompt the user for a branch name
echo -e "Please enter a branch name \e[0;32m(or leave blank for current branch)\e[0m: "
# set text color to green
tput setaf 2

read branch_name
# reset text color
tput sgr0

# If no branch name was entered, use the current branch
if [ -z "$branch_name" ]; then
    branch_name=$(git rev-parse --abbrev-ref HEAD)
    echo -e "Using current branch '\e[0;32m$branch_name\e[0m'."
else
    # Check if the branch already exists
    if git branch -a | grep -q "$branch_name"; then
        echo -e "Branch \e[0;32m$branch_name\e[0m already exists. Pushing to the existing branch."
    else
        # Create a new branch with the specified name
        git checkout -b $branch_name
    fi
fi

# Prompt the user for a commit message
echo -e "\e[0;32mPlease enter a commit message: \e[0m"
# set text color to green
tput setaf 2

read commit_message
# reset text color
tput sgr0


# Add and commit the changes with the specified commit message
git add .
git commit -m "$commit_message"

# python3 code_check.py

# Push the changes to the remote branch
git push --set-upstream origin $branch_name

# Prompt the user if they want to checkout to develop branch
echo -e "\e[0;32mDo you want to checkout to main branch? [y/n]: \e[0m"
# set text color to green
tput setaf 2

read checkout_develop
# reset text color
tput sgr0

if [[ $checkout_develop == "y" || $checkout_develop == "Y" ]]; then
    git checkout main
    git pull origin main
fi