import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Marketing Manager'];
  const roles = ['Media Planner', 'Marketing Manager'];
  const applicationName = 'Advertising budget allocator';
  const tenantName = 'Advertiser';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Marketing Manager creates an Advertiser account

As a Marketing Manager,
I want to create an Advertiser account,
So that I can manage my advertising budgets across multiple networks.

---

Title: Marketing Manager adds business constraints

As a Marketing Manager,
I want to add business constraints to my Advertiser account,
So that the application can allocate budgets based on my specific requirements.

---

Title: Marketing Manager imports past performance data

As a Marketing Manager,
I want to import past performance data for my advertising campaigns,
So that the application can use this data to optimize budget allocation.

---

Title: Marketing Manager invites Media Planner

As a Marketing Manager,
I want to invite a Media Planner to my Advertiser account,
So that they can help me manage and optimize my advertising budgets.

---

Title: Media Planner reviews past performance data

As a Media Planner,
I want to review the past performance data of advertising campaigns,
So that I can make informed decisions on budget allocation.

---

Title: Media Planner adjusts budget allocation

As a Media Planner,
I want to adjust the budget allocation for advertising campaigns,
So that I can optimize the performance based on past data and business constraints.

---

Title: Marketing Manager reviews and approves budget allocation

As a Marketing Manager,
I want to review and approve the budget allocation proposed by the Media Planner,
So that I can ensure it aligns with my business goals and constraints.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
